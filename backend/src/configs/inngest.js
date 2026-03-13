import { Inngest } from "inngest";
import User from "../models/User.js";
import { connectToDatabase } from "./db.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
import { transporter } from "./nodemailer.js"; // ✅ Import transporter from your new file

export const inngest = new Inngest({ id: "talk-live" });

// CREATE USER
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectToDatabase();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });

    // Send Welcome Email
    await transporter.sendMail({
      from: `"TalkLive" <${process.env.EMAIL_USER}>`,
      to: newUser.email,
      subject: "Welcome to TalkLive 🎉",
      html: `
        <h2>Hello ${newUser.name}</h2>
        <p>Welcome to TalkLive!</p>
        <p>Your account has been successfully created.</p>
        <p>Start chatting and video calling now 🚀</p>
      `,
    });
  }
);

// DELETE USER
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectToDatabase();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

        // todo: do smothing
        await deleteStreamUser(id.toString());

  }
);

export const functions = [syncUser, deleteUserFromDB];