from enum import Enum

class AssessmentState(Enum):
    DRAFT = "draft"#Drafted, user will choose the list of issues to be closed, or accept the risk, or will be fixed later and is accepted for now.
    OPEN = "open"#Created, and waiting to be acknowledged by the team
    IN_PROGRESS = "in_progress"# Acknoewledged, and assinged to resource
    PENDING_REVIEW = "pending_review"# Assignement was completed, and is waiting for review to be done by L2, admin ,etc.
    UNDER_REVIEW = "under_review"# Under review
    # ACCEPTED = "accepted"# Review completed, accepted, and is good to be published
    REJECTED = "rejected"# Review rejected, and goe back to in_progress on aseessor's screen
    CLOSED = "closed"
    ARCHIVED = "archived"
    
    


