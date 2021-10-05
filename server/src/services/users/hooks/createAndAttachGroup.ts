import { HookContext } from '@feathersjs/feathers'

const createAndAttachGroup = () => async (context: HookContext): Promise<HookContext> => {
  const groupService = context.app.service('groups')
  const userService = context.app.service('users')

  const newGroup = await groupService.create({
    name: `Group for ${context.data.username}`,
  })

  context.result = await userService.patch(context.result.id, {
    idGroup: newGroup.id,
  })

  return context
}

export default createAndAttachGroup
