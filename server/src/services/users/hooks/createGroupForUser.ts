import { HookContext } from '@feathersjs/feathers'

const createGroupForUser = () => async (context: HookContext): Promise<HookContext> => {
  const groupService = context.app.service('groups')

  const newGroup = await groupService.create({
    name: `Group for ${context.data.username}`,
  })

  return context.app.service('users').patch({
    idGroup: newGroup.id,
  })
}

export default createGroupForUser
