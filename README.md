# Niên luận Cơ sở/Chuyên ngành CTXXX

**Học kỳ**: X, **Năm học**: 20XX-20XX

**MSSV**: X

**Họ tên**: X

**Tên đề tài**: X

---

#### **Hướng dẫn cách push code và báo cáo**:

1. Nhận repo code từ link GV gửi.

2. **<u>Nếu code của bạn chỉ trong một repo git duy nhất</u>**, để push code và báo cáo lên repo code mới nhận:

   - Thêm và commit file báo cáo PDF vào repo git cục bộ.

   - Thực thi các lệnh sau để push code lên repo git đã nhận:

     ```bash
     git remote add classroom <link-repo-code đã nhận>.git # Lưu ý thêm đuôi .git vào link
     git push classroom master
     ```
   - Kiểm tra lại trên repo code đã nhận đã được cập nhật.

3. **<u>Nếu code của bạn lưu ở hai repo khác nhau (ví dụ như một repo cho frontend và một repo cho backend)</u>** thì clone repo đã nhận về, copy code từ hai repo của bạn vào repo đã nhận (ví dụ như để ở hai thư mục frontend và backend). Sau đó, commit và push lên bình thường (lưu ý thêm báo cáo PDF vào).
