json.key_format! camelize: :lower

json.user do
  json.(@user, :id, :name, :email, :icon_path, :status, :created_at, :updated_at)
end
json.auth do
  json.(@auth, :token, :exp)
end