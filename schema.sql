CREATE TABLE `User` (
  `User_id` int,
  `User_type` int,
  `name` varchar(255),
  `email` varchar(255),
  `password_hash` varchar(255),
  `PRIMARY` KEY(User_id)
);

CREATE TABLE `Student` (
  `User_id` int,
  `Student_id` int,
  `PRIMARY` KEY(Student_id),
  `FOREIGN` KEY(User_id)
);

CREATE TABLE `Society_member` (
  `User_id` int,
  `member_id` int,
  `PRIMARY` KEY(member_id),
  `FOREIGN` KEY(User_id)
);

CREATE TABLE `Admin` (
  `User_id` int,
  `Admin_id` int,
  `PRIMARY` KEY(Admin_id),
  `FOREIGN` KEY(User_id)
);

CREATE TABLE `Society` (
  `Society_id` int,
  `name` string,
  `email` string,
  `PRIMARY` KEY(Society_id)
);

CREATE TABLE `Posts` (
  `posts_id` int,
  `title` varchar(255),
  `content` varchar(255),
  `user_id` int,
  `society_id` int,
  `is_society_post` bool,
  `PRIMARY` KEY(posts_id),
  `FOREIGN` KEY(user_id)
);

CREATE TABLE `Society_membership` (
  `member_id` int,
  `Society_id` int,
  `joined` bool,
  `PRIMARY` KEY(member_id  society_id),
  `FOREIGN` KEY(member_id)
);

CREATE TABLE `Interactions` (
  `post_id` int,
  `comment` varchar(255),
  `user_id` int,
  `liked` bool,
  `FOREIGN` KEY(post_id)
);

CREATE TABLE `events` (
  `events_id` int,
  `name` varchar(255),
  `society_id` int,
  `date` date,
  `PRIMARY` KEY(events_id),
  `FOREIGN` KEY(Society_id)
);

CREATE TABLE `Event_attendance` (
  `event_id` int,
  `user_id` int,
  `PRIMARY` KEY(event_id  user_id),
  `FOREIGN` KEY(event_id)
);

ALTER TABLE `Society_member` ADD FOREIGN KEY (`member_id`) REFERENCES `Society_membership` (`member_id`);

ALTER TABLE `Society` ADD FOREIGN KEY (`Society_id`) REFERENCES `Society_membership` (`Society_id`);

ALTER TABLE `Student` ADD FOREIGN KEY (`User_id`) REFERENCES `User` (`User_id`);

ALTER TABLE `Admin` ADD FOREIGN KEY (`User_id`) REFERENCES `User` (`User_id`);

ALTER TABLE `Society_member` ADD FOREIGN KEY (`User_id`) REFERENCES `User` (`User_id`);

ALTER TABLE `Interactions` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`User_id`);

ALTER TABLE `Interactions` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`posts_id`);

ALTER TABLE `Posts` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`User_id`);

ALTER TABLE `Event_attendance` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`events_id`);

ALTER TABLE `Event_attendance` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`User_id`);

ALTER TABLE `events` ADD FOREIGN KEY (`society_id`) REFERENCES `Society` (`Society_id`);

ALTER TABLE `Posts` ADD FOREIGN KEY (`society_id`) REFERENCES `Society` (`Society_id`);
