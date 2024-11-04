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
	projectDocumentations: many(projectDocumentation)
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

	// address
	locality: text('locality').notNull(),
	postCode: text('post_code').notNull(),
	street: text('street').notNull(),
	apartment: text('street'),

	// flags
	isDone: integer('is_done', { mode: 'boolean' }).notNull(),
	isDraft: integer('is_draft', { mode: 'boolean' }).notNull(),

	// timestamps
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const projectRelations = relations(project, ({ many }) => ({
	documentation: many(projectDocumentation)
}));

export const projectDocumentation = sqliteTable('project_documentation', {
	id: text('id').primaryKey(),

	fileURL: text('file_url').notNull(),
	fileName: text('file_name').notNull(),
	fileSize: integer('filesize').notNull(),
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

export const projectDocumentationRelations = relations(projectDocumentation, ({ one }) => ({
	user: one(user, {
		fields: [projectDocumentation.userId],
		references: [user.id]
	}),
	project: one(project, {
		fields: [projectDocumentation.projectId],
		references: [project.id]
	})
}));

// export const partnerCompany = sqliteTable('partner_company', {
// 	id: text('id').primaryKey(),
// 	label: text('label').notNull(),
// 	description: text('description'),

// 	email: text('email'),
// 	phone: text('phone'),
// 	avatar: text('avatar')
// });

// export const partnerCompanyRelations = relations(partnerCompany, ({ many }) => ({
// 	contacts: many(partnerContact)
// }));

// export const partnerContact = sqliteTable('partner_contact', {
// 	id: text('id').primaryKey(),
// 	name: text('name').notNull(),

// 	email: text('email'),
// 	phone: text('phone'),

// 	companyId: text('company_id')
// });

// export const partnerContactRelations = relations(partnerContact, ({ one }) => ({
// 	partnerCompany: one(partnerContact, {
// 		fields: [partnerContact.companyId],
// 		references: [partnerCompany.id]
// 	})
// }));

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type OAuthConnection = typeof oauthConnection.$inferSelect;

export type Project = typeof project.$inferSelect;
export type ProjectDocumentation = typeof projectDocumentation.$inferSelect;
