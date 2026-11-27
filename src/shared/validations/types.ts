export type ZodErrorIssueType = { message?: string; path?: unknown };
export type ZodResponseType = { error?: { issues?: ZodErrorIssueType[] } };
