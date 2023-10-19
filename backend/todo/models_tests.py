import pytest
from .models import User

def test_add_user():
    user = User()
    user.add_name("Tom")
    print(user.get_name())
    assert user.get_name() == "Tom"

def test_add_name_with_num():
    user = User()
    with pytest.raises(ValueError):
        user.add_name("T0m") 

   
