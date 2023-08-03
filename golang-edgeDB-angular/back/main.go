package main

import (
	"context"
	"github.com/edgedb/edgedb-go"
	"github.com/gofiber/fiber/v2"
	"github.com/henriSedjame/todo_app/storage"
	"github.com/henriSedjame/todo_app/web"
	"log"
	"os"
	"os/signal"
	"time"
)

func main() {

	ctx := context.Background()

	// create edgedb client
	if client, err := edgedb.CreateClient(ctx, edgedb.Options{}); err != nil {
		log.Fatal(err)
	} else {
		defer func() {
			err := client.Close()
			if err != nil {
				log.Print("error while closing edgedb client")
			}
		}()

		handlers := web.TodoHandlers{
			Dao: &storage.TodoStorage{
				Ctx:    ctx,
				Client: client,
			},
		}

		// create fiber app
		app := fiber.New(fiber.Config{
			ErrorHandler: web.ErrorHandler,
		})

		// expose front ui
		app.Static("/", "./static")

		// expose _todo api
		web.ConfigureTodoRoutes(app, handlers)

		// start server
		go func() {
			log.Fatal(app.Listen(":3000"))
		}()

		// shutdown gracefully
		shutdownGracefully(app)
	}

}

func shutdownGracefully(app *fiber.App) {
	osSignal := make(chan os.Signal)

	signal.Notify(osSignal, os.Interrupt)
	signal.Notify(osSignal, os.Kill)

	_ = <-osSignal

	log.Print("Shutting down server...")

	deadline, cancel := context.WithTimeout(context.Background(), 30*time.Second)

	defer cancel()

	log.Print(app.ShutdownWithContext(deadline))
}
