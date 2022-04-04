import Schema from '../models/Schema';

const JsonStreamStringify = require('json-stream-stringify');

export async function getSome(page: number, limit: number = 10) {
  return Schema.find({ _deletedAt: null })
    .skip(page > 0 ? (page - 1) * limit : 0)
    .limit(limit);
}

export async function createItem(data: Object) {
  console.log(data);
  const todo = new Schema(data);
  return await todo.save();
}

export async function updateItem({
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
  return Schema.updateOne({ _id: id }, omited);
}

export async function deleteItem(id: string) {
  return Schema.updateOne({ _id: id }, { _deletedAt: Date.now() });
}

export async function getItemById(id: string) {
  return Schema.find({ _id: id });
}

export function jsonStreamStringify() {
  return new JsonStreamStringify(Schema.find({ _deletedAt: null }).stream());
}
export function jsonStreamStringifyAll() {
  return new JsonStreamStringify(Schema.find({}).stream());
}

