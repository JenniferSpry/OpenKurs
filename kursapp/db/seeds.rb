# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

CoursePart.delete_all
Course.delete_all
User.delete_all

admin = User.create(username:'admin', email: 'mail@admin.de', password: 'adminadmin', admin: true )
User.create(username:'foobar', email: 'foo@bar.de', password: 'foobarbar', admin: false )

algo = Course.create(title: "Algorithmen", user_id: admin.id, description: "Was sind eigentlich Algorithmen?", image_name: "algorithmen.jpg", order: 1)  
  CoursePart.create(title: "Backrezepte", course_id:algo.id, order: 1, template: "Backrezepte")
  CoursePart.create(title: "Algorithmen bewerten", course_id:algo.id, order: 2, 
    template: "Für ein Problem gibt es immer gute und schlechte Lösungen. Wie bewertet man algorithmische Lösungen?")  
  CoursePart.create(title: "Polynomial und Exponentiell", course_id:algo.id, order: 3, template: "Polynomial und Exponentiell")
  CoursePart.create(title: "NP-schwer", course_id:algo.id, order: 4, template: "NP-schwer")


graph = Course.create(title: "Graphen", user_id: admin.id, description: "Was sind Graphen und wofür sind sie gut?", image_name: "graphen.jpg", order: 2)
  CoursePart.create(title: "Beispiele 1", course_id:graph.id, order: 1, template: "Beispiele 1")
  CoursePart.create(title: "Beispiele 2", course_id:graph.id, order: 2, template: "Beispiele 2")

graphc = Course.create(title: "Graphen und Färbungsprobleme", user_id: admin.id, 
  description: "Lerne was Graphen sind und warum sie clever zu färben eine wichtige Frage der Informatik ist.", image_name: "graphenfaerbungsprobleme.jpg")
  CoursePart.create(title: "2-färbbarkeit/Bipartite Graphen", course_id:graphc.id, order: 1, template: "2-färbbarkeit/Bipartite Graphen", order: 3)
  CoursePart.create(title: "3-färbbarkeit", course_id:graphc.id, order: 2, template: "3-färbbarkeit")
  CoursePart.create(title: "Greedy Algorithmus", course_id:graphc.id, order: 3, template: "Greedy Algorithmus")
  CoursePart.create(title: "Lawlers Algorithmus", course_id:graphc.id, order: 4, template: "Lawlers Algorithmus")