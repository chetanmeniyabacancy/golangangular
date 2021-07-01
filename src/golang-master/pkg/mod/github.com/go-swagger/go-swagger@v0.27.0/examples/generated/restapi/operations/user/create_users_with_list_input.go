// Code generated by go-swagger; DO NOT EDIT.

package user

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// CreateUsersWithListInputHandlerFunc turns a function with the right signature into a create users with list input handler
type CreateUsersWithListInputHandlerFunc func(CreateUsersWithListInputParams) middleware.Responder

// Handle executing the request and returning a response
func (fn CreateUsersWithListInputHandlerFunc) Handle(params CreateUsersWithListInputParams) middleware.Responder {
	return fn(params)
}

// CreateUsersWithListInputHandler interface for that can handle valid create users with list input params
type CreateUsersWithListInputHandler interface {
	Handle(CreateUsersWithListInputParams) middleware.Responder
}

// NewCreateUsersWithListInput creates a new http.Handler for the create users with list input operation
func NewCreateUsersWithListInput(ctx *middleware.Context, handler CreateUsersWithListInputHandler) *CreateUsersWithListInput {
	return &CreateUsersWithListInput{Context: ctx, Handler: handler}
}

/* CreateUsersWithListInput swagger:route POST /users/createWithList user createUsersWithListInput

Creates list of users with given input array

*/
type CreateUsersWithListInput struct {
	Context *middleware.Context
	Handler CreateUsersWithListInputHandler
}

func (o *CreateUsersWithListInput) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewCreateUsersWithListInputParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
