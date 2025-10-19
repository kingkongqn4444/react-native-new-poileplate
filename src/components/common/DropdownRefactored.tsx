/**
 * Dropdown Component with Styled Components
 * Reusable dropdown selector for category and sort options
 */

import React, { useState } from 'react';
import { Modal, FlatList } from 'react-native';
import * as S from './Dropdown.styled';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Selector onPress={() => setIsVisible(true)}>
        <S.SelectedText>{selectedOption?.label}</S.SelectedText>
        <S.Arrow>▼</S.Arrow>
      </S.Selector>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <S.ModalOverlay
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <S.ModalContent>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <S.Option
                  selected={item.value === selectedValue}
                  onPress={() => handleSelect(item.value)}
                >
                  <S.OptionText selected={item.value === selectedValue}>
                    {item.label}
                  </S.OptionText>
                </S.Option>
              )}
            />
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </S.Container>
  );
};