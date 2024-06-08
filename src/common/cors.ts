export const corsOptions = {
    allowedHeaders:
      "X-Requested-With, Content-Type, Origin, Authorization, Accept, x-auth-token, x-portal-token, Accept-Encoding, X-niyoappApp-error, X-niyoappApp-params, X-niyoappApp-exceptionCode, X-Total-Count, Link, X-niyoappApp-alert, OtpRefId, x-client-id, x-session-id, x-correlation-id, x-timezone-id, x-device-id, x-login-pin, x-accessible-corporates,x-selected-corporate,x-force-regenerate,x-include-cash,x-include-claim, x-stats-only, x-include-none",
    exposedHeaders:
      "X-Requested-With, Content-Type, Origin, Authorization, Accept, x-auth-token, x-portal-token, Accept-Encoding, X-niyoappApp-error, X-niyoappApp-params, X-niyoappApp-exceptionCode, X-Total-Count, Link, X-niyoappApp-alert, X-last-record-date,x-accessible-corporates,x-selected-corporate,x-force-regenerate,x-include-cash,x-include-claim, x-stats-only,  x-include-none",
    methods: "POST, PUT, GET, DELETE, PATCH, HEAD"
  };