import { ServiceDefinition, UntypedServiceImplementation } from "@grpc/grpc-js";

interface ServerImpl <SD extends ServiceDefinition, USI extends UntypedServiceImplementation> {
  serviceDefinition: SD;
  Impl: USI;
}

export {
  ServerImpl
}