json.upload do
  json.partial! 'uploads/upload', locals: { upload: @upload }
end