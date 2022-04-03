import Schema from '../models/Schema';

const JsonStreamStringify = require('json-stream-stringify');

export async function getSome(page: number, limit: number = 10) {
  return Schema.find({ _deletedAt: null })
    .skip(page > 0 ? (page - 1) * limit : 0)
    .limit(limit);
}

export async function createTodo(data: Object) {
  const todo = new Schema(data);///todo
  return await todo.save();
}

export async function updateTodo({
                                   id,
                                   title,
                                   body,
                                 }: {
  id: string;
  title: string;
  body: boolean;
}) {
  let omited: { title?: string; body?: boolean } = {};
  if (title !== undefined) {
    omited.title = title;
  }

  if (typeof body !== 'boolean') {
    omited.body = body;
  }
  return await Schema.updateOne({ _id: id }, omited);
}

export async function deleteTodo(id: string) {
  return Schema.updateOne({ _id: id }, { _deletedAt: Date.now() });
}

export async function getTodoById(id: string) {
  return Schema.find({ _id: id });
}

export function jsonStreamStringify() {
  return new JsonStreamStringify(Schema.find({ _deletedAt: null }).stream());
}
