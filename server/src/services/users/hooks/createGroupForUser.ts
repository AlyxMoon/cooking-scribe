import { HookContext } from '@feathersjs/feathers'

const createGroupForUser = () => async (context: HookContext): Promise<HookContext> => {
  const groupService = context.app.service('groups')

  const newGroup = await groupService.create({
    name: `Group for ${context.data.username}`,
  })

  context.data.idGroup = newGroup.id

  return context
}

export default createGroupForUser
