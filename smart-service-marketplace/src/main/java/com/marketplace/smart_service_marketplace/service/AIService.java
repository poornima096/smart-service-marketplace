package com.marketplace.smart_service_marketplace.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String getRecommendation(String userRequest) {

        String prompt = """
                You are an AI assistant for a Smart Service Marketplace.

                A customer describes a service they need.

                Analyze the customer's request and recommend the most
                appropriate service category and service type.

                Keep the response short and useful.

                Customer request:
                %s
                """.formatted(userRequest);

        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();
    }
}