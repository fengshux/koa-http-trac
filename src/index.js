"use strict";

const HttpTrace = require("http-trace");

module.exports = function( log ) {

    log = log || console;
	return async function ( ctx, next ) {
        let trace = HttpTrace.getTrace(ctx.header);
        trace.span.serverReceive();
        log.info(trace);
        ctx.state.trace = trace;

        await next();

        trace.span.serverSend();
        log.info(trace);
        trace.setHeader(ctx.header);
    };
};
