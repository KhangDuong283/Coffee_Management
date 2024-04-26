Thiết lập đường dẫn để sử dụng cho file config.php

Vào xampp/apache/conf/extra/httpd-vhosts.conf
Chỉnh sửa file httpd-vhosts.conf với nội dung như sau

Với 
    + "DocumentRoot" sẽ chứa đường dẫn tới thư mục public
    + "ServerName" chứa tên server sử dụng (nếu đổi thì phải đổi lại ở file config.php)
Cách lấy đường dẫn cho "DocumentRoot"
    + B1: Chuột phải vào thư mục public của project
    + B2: Chọn "copy path" hoặc "alt + shitf + c"
Nếu đụng cổng hãy chỉnh "<VirtualHost *:80>" sang giá trị khác 80
<!-- 

<VirtualHost *:80>
DocumentRoot "C:/xampp/htdocs"
ServerName localhost
</VirtualHost>
<VirtualHost *:80>
DocumentRoot "C:\Users\WIN\Desktop\NienLuan\ct271-project-KhangDuong283\backend-coffee_management\ct271\api\public"
ServerName nienluan.localhost
# Set access permission
<Directory "C:\Users\WIN\Desktop\NienLuan\ct271-project-KhangDuong283\backend-coffee_management\ct271\api\public">
Options Indexes FollowSymLinks Includes ExecCGI
AllowOverride All
Require all granted
</Directory>
</VirtualHost> 

-->