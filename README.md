# conference_backend
This project is created by Tugsbayar Tseveendorj for Tauria code interview. I hope you would like it. 
🚀🚀🚀 I am a quick learner 🚀🚀🚀
![](https://i.pinimg.com/originals/58/bb/43/58bb43ad5249d0cfbb2da6b86f3a3b19.gif)


Check my profile <a href="https://www.linkedin.com/in/tugsbayar-tseveendorj-0192b7b5/">LinkedIn</a> 💼

## Getting Started
### Installing
Cloning the project.
```
git clone https://github.com/tugsuu88/conference_backend.git
```
Access the project directory.
```
cd conference_backend
```
Install dependencies.
```
npm install
```
Serve with hot reload at http://localhost:3050.
```
npm run dev
```

### 3 Questions
1. Entity relationship diagram
2. /api/v1/room/changeParticipantTimeInMeeting [service]
3. (feign, redis, cache data, database view)
```
/api/v1/user/getUsers [service]
```

### Entity relationship diagram
![](./assets/ERD.jpg)

### Tables
List of used tables
```
USERS
GUESTS
TEAMS
TEAM_MEMBERS
CONFERENCE_ROOMS
PARTICIPANTS
```
### Postman collection
```
https://www.getpostman.com/collections/9ba9d1e02b088e8e4ac8
```
### Services
services of user table
```
/api/v1/user/createUser
/api/v1/user/updateUser
/api/v1/user/deleteUser
/api/v1/user/getUsers
/api/v1/user/getTeamsOfUser
```
services of guest table
```
/api/v1/guest/createGuest
/api/v1/guest/updateGuest
/api/v1/guest/deleteGuest
/api/v1/guest/getGuests
```
services of team table
```
/api/v1/team/createTeam
/api/v1/team/updateTeam
/api/v1/team/addTeamMember
/api/v1/team/addBulkMembers
/api/v1/team/removeMember
/api/v1/team/removeBulkMember
/api/v1/team/getTeams
/api/v1/team/getUsersOfTeam
```

services of team table
```
/api/v1/room/createConferenceRoom
/api/v1/room/updateConferenceRoom
/api/v1/room/addRequiredParticipants
/api/v1/room/addBulkRequiredParticipants
/api/v1/room/addOptionalParticipants
/api/v1/room/addBulkOptionalParticipants
/api/v1/room/addGuestParticipants
/api/v1/room/addBulkGuestParticipants
/api/v1/room/changeParticipantTimeInMeeting

/api/v1/room/getParticipants
/api/v1/room/getRequiredParticipants
/api/v1/room/getOptionalParticipants
/api/v1/room/getGuestParticipants
/api/v1/room/getUserParticipants
```