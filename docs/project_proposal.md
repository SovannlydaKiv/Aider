# Aider

## Problem
These days, families struggle to find the time between their job and taking care of their loved ones, making it close to impossible to manage their health and household simultaneously. Elderly individuals, new mothers, disabled people all have difficulties with finding reliable help services; therefore, an accessible and simple platform matters because it quickly connects vulnerable individuals or busy households with qualified helpers based on the urgency, distance, and experience needed.

## Users and roles
* **Client (Elderly User or Family)**: Creates simple job requests, filters available helpers by specific requirements (time, experience, urgency), and approves applications.
* **Helper (Caretaker)**: Browses and searches for available jobs, filters by location or schedule flexibility, and applies to listings that match their qualifications.
* **Admin**: Monitors the platform, deletes inappropriate job postings, and bans users so that the platform remains safe.

## User stories
1. As a Client, I want to filter helpers by time commitment (full-time/part-time) and experience requirements so that I can find someone who can fulfil my household's needs.
*Accepted when*: Users can select full-time, part-time, or "whenever needed" toggles; users can filter by "degree required" or "no experience"; search results update to match the selected filters.
2. As a Helper, I want to see the urgency level and general distance of a job posting so that I can prioritize urgent requests that are close to my location.
*Accepted when*: Job postings display a clear urgency badge; distance is indicated on the posting; helpers can sort the feed by highest urgency.
3. As a Client, I want to create a new job posting using a simple, large-button interface so that I don't get overwhelmed or confused by the technology.
*Accepted when*: The job creation form has a maximum of 4 essential fields; the UI uses large fonts and high-contrast buttons; validation errors are written in plain, non-technical language.
4. As a Helper, I want to create a profile detailing my experience level and degrees so that I can stand out to families needing specialized care.
5. As a Client, I want to view a helper's profile so that I can verify their background before accepting their application.
6. As a Helper, I want to save job postings to a personal list so that I can review and compare them before deciding which ones to apply for.
7. As a Client, I want to approve or decline a helper's application so that I have final control over who comes to my home.
8. As an Admin, I want to delete inappropriate job postings or ban users so that the platform remains safe for the users.
9. As a Client, I want to leave a simple rating for a helper after a job is complete so that other users know they are trustworthy.

## MVP scope
**Must have**:
* Filter helpers by time commitment and experience requirements
* Create a new job posting using a simple interface
* Helper profile creation (experience level and degrees)
* View helper profiles
* Leave a rating for a helper after job completion
* Approve or decline helper applications
* Admin content moderation and user management

**Nice to have**:
* View job urgency level and general distance
* Save job postings to a personal list

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| **User** | `name`, `email`, `password`, `role` | Has one HelperProfile, has many JobPostings, has many Applications, has many Reviews |
| **HelperProfile** | `experience_level`, `degree`, `availability`, `location` | Belongs to User (the helper) |
| **JobPosting** | `title`, `description`, `urgency`, `location` | Belongs to User (the client), has many applications |
| **Application** | `status`, `applied_at` | Belongs to User (the helper), belongs to JobPosting |
| **Review** | `rating_score`, `comment`, `created_at` | Belongs to User (the client), belongs to User (the helper) |

## Stretch feature
**Search, filter and pagination**

What it does in this app: 

This core feature helps clients easily discover the right caretakers by searching the Helper Profile list. Clients can search by specific keywords, filter the results based on experience level and schedule flexibility (availability), and view the results paginated with 10 helper profiles per page. To keep things clear and effortless for elderly users, the profiles will be on display for them to be accessible, simple and intuitive so they can hire the users on their own or their children can do it for them.

## Repository
https://github.com/SovannlydaKiv/Aider.git