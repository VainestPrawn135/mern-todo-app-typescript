import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  id: number;
  title: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  id: { type: Number, required: true, default: 0},
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
