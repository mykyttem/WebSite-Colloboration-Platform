from flask import jsonify

from ...models.projects import Projects, Project_Mail_Box
from ...utils.data_user import get_user_data
from ...database.database_base import db


class ProjectJoiner:
    """
        Get the list of participants from the project
        If the user is not a member, add the user to the mailbox, asked to join
    """

    def __init__(self, project_id, id_user):
        self.project_id = project_id
        self.id_user = id_user


    def check_auth(self):
        if not self.id_user:
            return jsonify(message="the user not auth"), 403
        
        return None


    def check_project_membership(self):
        project = db.session.query(Projects).filter(Projects.id == self.project_id).first()
        
        users = [user_id for user_id in project.members]
        if self.id_user in users:   
            return jsonify(message="The user is already a participant in the project"), 401
        
        return None


    def create_or_update_mailbox(self):
        mail_box_project = db.session.query(Project_Mail_Box).filter(Project_Mail_Box.project_id == self.project_id).first()

        if not mail_box_project:
            # create mail box
            create_mail_box = Project_Mail_Box(project_id=self.project_id, requests_join=[self.id_user])  

            db.session.add(create_mail_box)
            db.session.commit()
        else:
            # update
            new_updated_list = []
            requests = mail_box_project.requests_join

            for request in requests:
                new_updated_list.append(request)

            if self.id_user in requests:
                return jsonify(message="The user has already requested to join the project"), 401
            
            new_updated_list.append(self.id_user)

            # save changes
            mail_box_project.requests_join = new_updated_list
            db.session.commit()

        return jsonify(message="Successful request added to mail box"), 200


    def join_project(self):
        error_response = self.check_auth()
        if error_response:
            return error_response
        
        error_response = self.check_project_membership()
        if error_response:
            return error_response
        
        return self.create_or_update_mailbox()


@get_user_data
def joining_project(project_id, id_user):
    joiner = ProjectJoiner(project_id, id_user)

    return joiner.join_project()