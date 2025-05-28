import app

db = app.db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), default="password")
    industry = db.Column(db.String(100), nullable=True)

    # Relationships
    wishes = db.relationship('Wish', back_populates='user')

    userType = db.Column(
        db.Enum('user', 'admin', name='user_type_enum'),
        default='user'
    )

    gender = db.Column(
        db.Enum('male', 'female', 'non_binary', 'prefer_not_to_say', 'other', name='gender_enum'),
        default='female'
    )

    age_group = db.Column(
        db.Enum('18-24', '25-34', '35-44', '45-54', '55-64', '65+', name='age_group_enum'),
        default='18-24'
    )

    created_at = db.Column(
        db.TIMESTAMP,
        server_default=db.func.current_timestamp()
    )


    def __init__(self, name, email, industry, gender, age_group, password="password"):
        self.name = name
        self.email = email
        self.industry = industry
        self.password = password
        self.gender = gender
        self.age_group = age_group


    def __repr__(self):
        return f"User(name={self.name}, email={self.email}, industry={self.industry}, gender={self.gender}, age_group={self.age_group})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "industry": self.industry,
            "gender": self.gender,
            "age_group": self.age_group,
            "password": self.password
        }

class WishGroup(db.Model):
    __tablename__ = 'wishgroups'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)

    # Relationship to Wish
    wishes = db.relationship('Wish', back_populates='wishgroup')
    

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"User(name={self.name})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
    
class Wish(db.Model):
    __tablename__ = 'wishes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('wishgroups.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())


    # Relationships
    user = db.relationship('User', back_populates='wishes')
    wishgroup = db.relationship('WishGroup', back_populates='wishes')  

    def __init__(self, name, url, user_id, group_id):
        self.name = name
        self.url = url
        self.user_id = user_id
        self.group_id = group_id

    def __repr__(self):
        return f"Wish(name={self.name}, url={self.url}, user_id={self.user_id}, group_id={self.group_id})"
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "user_id": self.user_id,
            "group_id": self.group_id,
            "wishgroup_name": self.wishgroup.name if self.wishgroup else None
        }
    
