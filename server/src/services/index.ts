import { Application } from '../declarations'

import groupChats from './groupChats/groupChats.service'
import groups from './groups/groups.service'
import users from './users/users.service'

export default function (app: Application): void {
  app.configure(groupChats)
  app.configure(groups)
  app.configure(users)
}
