// import { Schema, model, Types, Document } from "mongoose";

// export interface IChatroom extends Document {
//   sender: Types.ObjectId;            // Doctor
//   receiver: Types.ObjectId;          // Patient
//   session: Types.ObjectId;           // One-to-One Session
//   messages: Types.ObjectId[];        // One-to-Many Messages
// }

// const chatroomSchema = new Schema<IChatroom>(
//   {
//     sender: {
//       type: Schema.Types.ObjectId,
//       ref: "HealthCareProvider",     // or just "User" if unified
//       required: true
//     },
//     receiver: {
//       type: Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true
//     },
//     session: {
//       type: Schema.Types.ObjectId,
//       ref: "Session",
//       required: true,
//       unique: true     // ensure one-to-one with Session
//     },
//     messages: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Message"
//       }
//     ]
//   },
//   { timestamps: true }
// );

// export default model<IChatroom>("Chatroom", chatroomSchema);

import { Schema, model, Types, Document } from "mongoose";

export interface IChatroom extends Document {
  sender: Types.ObjectId;            // ref: HealthCareProvider
  receiver: Types.ObjectId;          // ref: Patient
  session: Types.ObjectId;           // ref: Session (one-to-one)
  messages: Types.ObjectId[];        // refs: Messages (one-to-many)
}

const chatroomSchema = new Schema<IChatroom>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      unique: true
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  },
  { timestamps: true }
);

export default model<IChatroom>("Chatroom", chatroomSchema);
