package web

import "github.com/gofiber/fiber/v2"

const (
	basePath  = "/api/todos"
	emptyPath = ""
	idPath    = ":id"
)

func Routes(app *fiber.App, handlers TodoHandlers) {
	api := app.Group(basePath)

	api.Get(emptyPath, handlers.GetAll)
	api.Get(idPath, handlers.GetById)
	api.Post(emptyPath, handlers.Create)
	api.Put(idPath, handlers.Update)
	api.Delete(idPath, handlers.Delete)
}
