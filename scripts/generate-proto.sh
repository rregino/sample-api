# generates a java-ish code with getters and setters
# protoc \
# --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
# --ts_out=./src/proto \
# -I ./proto \
# ./proto/*.proto

protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=messages,exportCommonSymbols=false,esModuleInterop=true \
--ts_proto_out=./main/proto \
--proto_path ./proto \
./proto/*.proto


# protoc \
# --plugin=./node_modules/.bin/protoc-gen-ts_proto \
# --ts_proto_opt=outputClientImpl=grpc-web,useOptionals=messages,esModuleInterop=true \
# --ts_proto_out=./main/client/src/proto \
# --proto_path ./proto \
# ./proto/*.proto

# protoc \
# --plugin=./node_modules/.bin/protoc-gen-ts_proto \
# --ts_proto_opt=outputClientImpl=grpc-web,useOptionals=messages,esModuleInterop=true,service=true \
# --ts_proto_out=./main/client/src/proto \
# --proto_path ./proto \
# ./proto/*.proto


