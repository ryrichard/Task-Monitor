### Wise Wallet Architecture


<img width="700px" src="images/HighLevelComponentDiag.png" alt="HighLevelComponentDiag" />

The user interface is made interactive using React for a smooth and engaging experience. We connect the front end to the database with Node.js and Next.js, ensuring efficient data communication. All the information is stored in MongoDB. Might use MongoDB Atlas to securely store and manage our data.

<img width="700px" src="images/EntityDiagram.png" alt="EntityDiagram" />

Our setup is pretty straightforward. First, we have the User database (User_DB) with the usual info. Users can choose to be part of a group, but it's not mandatory. Then, there's the GroupMember database (GroupMember_DB), which links users from User_DB to the Group database (Group_DB). The Group_DB only keeps an ID and a name to connect people. Lastly, there's the Task database (Task_DB) with properties like associated_id, title, description, and completed. The associated_id connects to either a group or an individual, which is why it's linked to both databases. The other properties just store relevant details.

<img width="1000px" src="./images/Flowchart.png" alt="Flowchart" />

The flowchart has three major components: the initial start, the group mechanics, and the task. The startwill be just a login/register interaction. This leads to the two other components. The Gourp Mechanics is the ability to create a group and perform CRUD with it. Users can create a group, add people to group, leave a group, remove someone from a group, or delete the group. Similarly, for the Task users/groups should be able to create, edit, or deleted a task. 
