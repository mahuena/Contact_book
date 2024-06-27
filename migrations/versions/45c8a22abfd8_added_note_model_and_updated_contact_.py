"""Added Note model and updated Contact model

Revision ID: 45c8a22abfd8
Revises: 0b315d5a0a96
Create Date: 2024-06-26 06:43:00.026842

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45c8a22abfd8'
down_revision = '0b315d5a0a96'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('message', sa.String(length=500), nullable=False))
        batch_op.add_column(sa.Column('date', sa.DateTime(), nullable=True))
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=500), nullable=False))
        batch_op.drop_column('date')
        batch_op.drop_column('message')

    # ### end Alembic commands ###