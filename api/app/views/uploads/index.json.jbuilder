json.items @uploads do |upload|
  json.partial! 'uploads/upload', locals: { upload: upload }
end

json.meta do
  json.current_page @uploads.current_page
  json.total_entries @uploads.total_entries
end
