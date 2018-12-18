import unittest
import app

class TestApp(unittest.TestCase):
    def test_make_list(self):
        
        data = "1,2,3\n4\n5,6,7"
        print(data)
        new_list = app.make_list(data)
        
        self.assertEqual(new_list, ["1","2","3","4","5","6","7"])

if __name__ == "__main__":
    unittest.main()