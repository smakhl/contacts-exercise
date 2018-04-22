import { schema, normalize } from 'normalizr'

const comment = new schema.Entity('comments', {
}, { idAttribute: '_id' })
const like = new schema.Entity('likes', {}, { idAttribute: '_id' })
const contact = new schema.Entity('contacts', {
    comments: [comment],
    likes: [like]
}, { idAttribute: '_id' })

const contactList = [contact]

export const contactsListNormalizr = data => normalize(data, contactList);
export const contactNormalizr = data => normalize(data, contact)
