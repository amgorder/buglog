export class Bug {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title || 'Bug '
    this.description = data.description || 'Default'
    this.creator = data.creator
    this.closed = data.closed
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt || ''
    this.updatedAt = data.updatedAt
  }
}
