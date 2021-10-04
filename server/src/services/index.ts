import { Application } from '../declarations'

import groups from './groups/groups.service'
import users from './users/users.service'

export default function (app: Application): void {
  app.configure(groups)
  app.configure(users)
}
