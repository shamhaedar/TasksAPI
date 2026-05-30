# 1. Base Image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:10 AS base
WORKDIR /app
EXPOSE 7860
EXPOSE 7860

# 2. SDK Image for building the code
FROM mcr.microsoft.com/dotnet/sdk:10 AS build
WORKDIR /src
COPY ["TasksAPI.csproj", "."]
RUN dotnet restore "TasksAPI.csproj"
COPY . .
RUN dotnet build "TasksAPI.csproj" -c Release -o /app/build

# 3. Publish the app
FROM build AS publish
RUN dotnet publish "TasksAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 4. Final runtime environment
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TasksAPI.dll"]