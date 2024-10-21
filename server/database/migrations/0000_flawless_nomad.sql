CREATE TABLE `chapters` (
	`id` integer DEFAULT 0,
	`created_at` text,
	`updated_at` text,
	`title` text,
	`root` text,
	`author` text,
	`text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`avatar` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);