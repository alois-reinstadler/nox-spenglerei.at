import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),

	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),

	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull()
});

export const userRelations = relations(user, ({ many }) => ({
	oauthConnections: many(oauthConnection),
	documentationEntries: many(documentationEntry)
}));

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),

	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const oauthConnection = sqliteTable(
	'oauth_connection',
	{
		providerId: text('provider_id').notNull(),
		providerName: text('provider_name').notNull(),

		userId: text('user_id')
			.notNull()
			.references(() => user.id)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.providerId, table.providerName] })
	})
);

export const oauthConnectionRelations = relations(oauthConnection, ({ one }) => ({
	user: one(user, {
		fields: [oauthConnection.userId],
		references: [user.id]
	})
}));

export const project = sqliteTable('project', {
	id: text('id').primaryKey(), // slug

	// general
	label: text('label').notNull(),
	description: text('description'),
	picture: text('picture'),

	// adress
	locality: text('locality').notNull(),
	postCode: text('post_code').notNull(),
	street: text('street').notNull(),
	apartment: text('street'),

	// timestamps
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const projectRelations = relations(project, ({ many }) => ({
	documentation: many(documentationEntry)
}));

export const documentationEntry = sqliteTable('documentation_entries', {
	id: text('id').primaryKey(),

	fileURL: text('file_url').notNull(),
	fileName: text('file_name').notNull(),
	fileExtension: text('file_extension').notNull(),
	fileType: text('file_type', { enum: ['image', 'video', 'pdf'] }).notNull(),

	userId: text('user_id')
		.notNull()
		.references(() => user.id),

	projectId: text('project_id')
		.notNull()
		.references(() => project.id),

	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const documentationEntryRelations = relations(documentationEntry, ({ one }) => ({
	user: one(user, {
		fields: [documentationEntry.userId],
		references: [user.id]
	}),
	project: one(project, {
		fields: [documentationEntry.projectId],
		references: [project.id]
	})
}));

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type OAuthConnection = typeof oauthConnection.$inferSelect;

export type Project = typeof project.$inferSelect;
export type DocumentationEntry = typeof documentationEntry.$inferSelect;
