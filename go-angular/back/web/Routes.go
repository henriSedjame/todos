package web

import "github.com/gofiber/fiber/v2"

func Routes(app *fiber.App, handlers TodoHandlers) {
	api := app.Group("/api/todos")

	api.Get("", handlers.GetAll)
	api.Get(":id", handlers.GetById)
	api.Post("", handlers.Create)
	api.Put(":id", handlers.Update)
	api.Delete(":id", handlers.Delete)
}
