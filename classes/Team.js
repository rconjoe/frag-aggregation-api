import __dirname from '../__dirname.js'
import { join } from 'path'
import { Low, JSONFile } from 'lowdb'
import * as fs from 'fs'
import _ from 'lodash'

const MAXPLAYERS = 7

/**
 * Used for all interactions with Team data.
 * @param {String} id - unique string ID
 * @param {String} user_id - I don't know
 * @param {String} name - Name of the team. No quotes/backticks.
 * @param {String} tag - Tag to display before player names i.e. [FTW]
 * @param {String} flag - Country flag of team origin
 * @param {String} logo - Full path to team logo
 * @param {Array} auths - array of all players STEAMID 2's
 * @param {Boolean} public_team - I don't know either
 */

export default class Team {

  constructor(
    id,
    user_id,
    name,
    tag,
    flag,
    logo,
    auths,
    public_team
  ) {
    this.id = id,
    this.user_id = user_id,
    this.name = name,
    this.tag = tag,
    this.flag = flag,
    this.logo = logo,
    this.auths = auths,
    this.public_team = public_team
  }

  /**
  * @returns {Path} - Fully qualified path of the team JSON database file
  */
  path() {
    const file = join(__dirname, 'db', 'team', `${this.name}.json`)
    return file
  }

  /**
   * @returns {Boolean} - Whether or not the JSON database file exists.
   */
  exists() {
    const pathString = this.path().toString()
    return fs.existsSync(pathString)
  }

  /**
   * @returns {LowDBInstance} Provides class method style access to the Team's LowDB instance API.
   */
  db() {
    const adapter = new JSONFile(this.path())
    const database = new Low(adapter)
    return database
  }

  /**
   * @returns {Object} - The contents of the JSON database file, if it exists.
   */
  async retrieve() {
    if (this.exists()) {
      const r = await this.db().read(this.path())
      return r.data
    }
    else {
      return `Database for ${this.name} does not exist.`
    }
  }

  /**
   * @returns {null} After establishing a local class instance, creates a team database.
   */
  async create() {
    const adapter = new JSONFile(this.path())
    const database = new Low(adapter)
    database.data = {
      "id": this.id,
      "user_id": this.user_id,
      "name": this.name,
      "tag": this.tag,
      "flag": this.flag,
      "logo": this.logo,
      "auths": this.auths,
      "public_team": this.public_team
    }
    await database.write()
  }

  async players() {
  }

}