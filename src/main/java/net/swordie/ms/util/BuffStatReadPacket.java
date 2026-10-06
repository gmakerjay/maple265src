package net.swordie.ms.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static net.swordie.ms.ServerConstants.DIR;

public class BuffStatReadPacket {

    private static final String FILE_PATH = STR."\{DIR}/secondaryStat.cpp";

    public static void main(String[] args) {
        try {
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));

            // Regex 1: Tìm toàn bộ khối if (getBuffStat(..., ID)) { ... }
            String outerRegex = "if\\s*\\(\\s*getBuffStat\\s*\\([\\w\\s,]*?(\\d+)\\s*\\)\\s*\\)\\s*\\{\\s*([\\s\\S]*?)\\}";
            Pattern outerPattern = Pattern.compile(outerRegex);
            Matcher outerMatcher = outerPattern.matcher(content);

            // Regex 2: Tìm các lệnh CInPacket::DecodeX
            // Group 1: Kích thước byte X (e.g., 1, 2, 4)
            Pattern innerPattern = Pattern.compile("CInPacket::Decode(\\d)");

            List<String> outputList = new ArrayList<>();

            // 1. Lặp qua tất cả các khối if (getBuffStat)
            while (outerMatcher.find()) {
                String id = outerMatcher.group(1);
                String blockContent = outerMatcher.group(2);

                Matcher innerMatcher = innerPattern.matcher(blockContent);

                List<String> encodeLines = new ArrayList<>();

                // 2. Lặp qua tất cả các lệnh DecodeX và sinh mã encode
                while (innerMatcher.find()) {
                    String sizeStr = innerMatcher.group(1);
                    String encodeCommand = generateEncodeCommand(sizeStr);
                    if (!encodeCommand.isEmpty()) {
                        encodeLines.add(encodeCommand);
                    }
                }

                // 3. Định dạng đầu ra: ID và các dòng mã encode
                if (!encodeLines.isEmpty()) {
                    // Dùng | để phân tách ID và các dòng mã (hoặc bạn có thể chọn ký tự khác)
                    // Dùng \n để xuống dòng cho dễ đọc nếu bạn muốn code thực tế
                    String encodeBlock = String.join(" ", encodeLines); // Dùng khoảng trắng để nối thành 1 dòng
                    outputList.add(id + " : " + encodeBlock);
                } else {
                    // Nếu không có DecodeX nào, chỉ ghi ID
                    outputList.add(id + " : <Không có lệnh Decode>");
                }
            }

            // 4. In kết quả cuối cùng
            if (outputList.isEmpty()) {
                System.out.println("Không tìm thấy cấu trúc Buff Stat với khối {} tương ứng trong file.");
            } else {
                String result = String.join(",\n", outputList); // Dùng ,\n để mỗi Buff Stat/Code block là một dòng mới

                System.out.println("Đã tìm thấy " + outputList.size() + " cấu trúc Buff Stat và mã Encode tương ứng:");
                System.out.println("------------------------------------");
                System.out.println(result);
                System.out.println("------------------------------------");
            }

        } catch (IOException e) {
            System.err.println("Lỗi khi đọc file: " + e.getMessage());
            System.err.println("Hãy đảm bảo rằng file '" + FILE_PATH + "' nằm cùng thư mục với chương trình Java.");
        } catch (NumberFormatException e) {
            System.err.println("Lỗi: Phát hiện DecodeX với X không phải 1, 2, hoặc 4.");
        }
    }

    /**
     * Chuyển kích thước byte (1, 2, 4) thành lệnh encode tương ứng.
     */
    private static String generateEncodeCommand(String size) {
        switch (size) {
            case "1":
                return "outPacket.encodeByte(0);";
            case "2":
                return "outPacket.encodeShort(0);";
            case "4":
                return "outPacket.encodeInt(0);";
            default:
                // Bỏ qua các giá trị decode khác (ví dụ: Decode8) nếu có
                return "";
        }
    }
}
