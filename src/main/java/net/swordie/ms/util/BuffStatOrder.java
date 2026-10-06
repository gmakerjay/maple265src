package net.swordie.ms.util;

import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static net.swordie.ms.ServerConstants.DIR;

public class BuffStatOrder {

    private static final String FILE_PATH = STR."\{DIR}/remote.cpp"; // secondaryStat.cpp nếu là local

    static void main(String[] args) {
        try {
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));
            String regex = "getBuffStat\\s*\\(\\s*mask\\s*,\\s*(\\d+)\\s*\\)";
            List<String> extractedValues = extractValues(content, regex);
            if (extractedValues.isEmpty()) {
                System.out.println("Không tìm thấy giá trị buff stat nào trong file.");
            } else {
                List<String> out = new ArrayList<>(extractedValues.size());
                for (String s : extractedValues) {
                    int code = Integer.parseInt(s);
                    CharacterTemporaryStat cts = CharacterTemporaryStat.getByBitPos(code);
                    out.add(cts != null ? cts.name() : code + "");
                }
                System.out.println("Tìm thấy " + extractedValues.size() + " giá trị buff stat:");
                System.out.println(String.join(", ", out));
            }

        } catch (IOException e) {
            System.err.println("Lỗi khi đọc file: " + e.getMessage());
            System.err.println("Hãy đảm bảo rằng file nằm cùng thư mục với chương trình Java.");
        }
    }

    /**
     * Hàm thực hiện trích xuất các giá trị số sử dụng Regex.
     * @param text Nội dung text đầu vào.
     * @param regex Biểu thức chính quy.
     * @return Danh sách các chuỗi giá trị số được trích xuất.
     */
    private static List<String> extractValues(String text, String regex) {
        List<String> matches = new ArrayList<>();
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);

        // Lặp qua tất cả các lần khớp
        while (matcher.find()) {
            // Lấy nội dung của nhóm bắt giữ đầu tiên (Group 1), chính là số cần tìm
            matches.add(matcher.group(1));
        }
        return matches;
    }
}