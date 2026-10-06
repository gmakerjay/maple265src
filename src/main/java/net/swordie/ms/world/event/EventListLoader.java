// EventListLoader.java
package net.swordie.ms.world.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;

public final class EventListLoader {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static List<EventListData> loadFromFile(Path path) {
        try (InputStream in = Files.newInputStream(path)) {
            List<EventListData> list = MAPPER.readValue(in, new TypeReference<>() {});
            return list == null ? Collections.emptyList() : list;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load events.json: " + path, e);
        }
    }
}
