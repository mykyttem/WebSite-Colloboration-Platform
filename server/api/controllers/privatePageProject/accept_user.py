from flask import jsonify
from ...models.projects import Projects, Project_Mail_Box
from ...database.database_base import db
from ...utils.logging import logger


class UserAcceptance:
    def __init__(self, id, idUser):
        self.id = id
        self.idUser = idUser

    def _get_project_and_mail_box(self):
        project = db.session.query(Projects).filter(Projects.id == self.id).first()
        mail_box = db.session.query(Project_Mail_Box).filter(Project_Mail_Box.project_id == self.id).first()
        return project, mail_box

    def accept_user(self):
        try:
            project, mail_box = self._get_project_and_mail_box()
            requests_joins = mail_box.requests_join

            if self.idUser not in project.members:
                # save
                updated_list = []

                if project.members:
                    updated_list.extend(project.members)
                updated_list.append(self.idUser)

                # update project members
                project.members = updated_list

                # remove user from requests_join list
                #FIXME
                requests_joins.remove(self.idUser)

                db.session.commit()

                return jsonify(message="Successful, member added to project"), 200
            else:
                return jsonify(message="The user is already a member"), 403
        except Exception as e:
            logger.error(f"Error adding user to members project {e}")
            return jsonify(message="Error adding user to member project"), 500