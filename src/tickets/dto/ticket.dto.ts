export const TicketStatusList = ['backlog', 'planned', 'doing', 'dev done', 'qa done'] as const;
export type TicketStatus = typeof TicketStatusList[number];

export const TicketPriorityList = ['low', 'normal', 'high'] as const;
export type TicketPriority = typeof TicketPriorityList[number];
