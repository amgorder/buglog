export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body || 'Note'
    this.bug = data.bug || data.bugId
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt || ''
  }
}
