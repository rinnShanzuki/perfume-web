CREATE TABLE `inquiry_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`action` text NOT NULL,
	`page` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`interest` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `journal_entries` (
	`path` text PRIMARY KEY NOT NULL,
	`raw` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `editor_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
