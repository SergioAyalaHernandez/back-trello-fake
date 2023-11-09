FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /usr/src/app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["oxegw.csproj", "."]
RUN dotnet restore "./oxegw.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "oxegw.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "oxegw.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "oxegw.dll"]