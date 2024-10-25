CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`status` text,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
DROP TABLE `students`;